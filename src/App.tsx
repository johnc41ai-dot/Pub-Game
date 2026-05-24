import { useState } from 'react';
import { Plus, Minus, Users, Trophy, Home, Trash2 } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  score: number;
}

type View = 'home' | 'game' | 'leaderboard';

function App() {
  const [view, setView] = useState<View>('home');
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');

  const addPlayer = () => {
    if (playerName.trim() === '') return;
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerName.trim(),
      score: 0,
    };
    setPlayers([...players, newPlayer]);
    setPlayerName('');
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const updateScore = (id: string, delta: number) => {
    setPlayers(players.map(p =>
      p.id === id ? { ...p, score: p.score + delta } : p
    ));
  };

  const resetScores = () => {
    setPlayers(players.map(p => ({ ...p, score: 0 })));
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getMedal = (index: number) => {
    const colors = ['text-amber-400', 'text-gray-400', 'text-amber-700'];
    return index < 3 ? colors[index] : 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amber-400">Pub Game</h1>
          <nav className="flex gap-2">
            <button
              onClick={() => setView('home')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'home'
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Home size={20} />
            </button>
            <button
              onClick={() => setView('game')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'game'
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Users size={20} />
            </button>
            <button
              onClick={() => setView('leaderboard')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'leaderboard'
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Trophy size={20} />
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Home View */}
        {view === 'home' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-amber-500/20 rounded-full">
                <Trophy size={48} className="text-amber-400" />
              </div>
              <h2 className="text-4xl font-bold text-white">Welcome to Pub Game</h2>
              <p className="text-slate-400 text-lg">
                Add players and track scores for your pub games night
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Add Players</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                  placeholder="Enter player name"
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  onClick={addPlayer}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add
                </button>
              </div>

              {players.length > 0 && (
                <div className="space-y-2 pt-4">
                  <p className="text-slate-400 text-sm">
                    {players.length} player{players.length !== 1 ? 's' : ''} added
                  </p>
                  <div className="grid gap-2">
                    {players.map(player => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between bg-slate-700/50 rounded-lg px-4 py-3"
                      >
                        <span className="text-white font-medium">{player.name}</span>
                        <button
                          onClick={() => removePlayer(player.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {players.length >= 2 && (
              <div className="text-center">
                <button
                  onClick={() => setView('game')}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-amber-500/25"
                >
                  Start Game
                </button>
              </div>
            )}
          </div>
        )}

        {/* Game View */}
        {view === 'game' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Score Board</h2>
              <button
                onClick={resetScores}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Reset Scores
              </button>
            </div>

            {players.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>No players yet. Add players from the home screen.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{player.name}</p>
                        <p className="text-slate-400 text-sm">
                          Rank #{sortedPlayers.findIndex(p => p.id === player.id) + 1}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateScore(player.id, -1)}
                        className="w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-colors"
                      >
                        <Minus size={24} />
                      </button>
                      <div className="w-20 text-center">
                        <p className="text-4xl font-bold text-white">{player.score}</p>
                      </div>
                      <button
                        onClick={() => updateScore(player.id, 1)}
                        className="w-12 h-12 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center transition-colors"
                      >
                        <Plus size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Leaderboard View */}
        {view === 'leaderboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center">Leaderboard</h2>

            {players.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Trophy size={48} className="mx-auto mb-4 opacity-50" />
                <p>No players yet. Add players from the home screen.</p>
              </div>
            ) : (
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="divide-y divide-slate-700">
                  {sortedPlayers.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center gap-4 p-6 ${
                        index === 0
                          ? 'bg-amber-500/10'
                          : index === 1
                          ? 'bg-slate-400/10'
                          : index === 2
                          ? 'bg-amber-700/10'
                          : ''
                      }`}
                    >
                      <div className="w-12 text-center">
                        {index < 3 ? (
                          <Trophy size={28} className={getMedal(index)} />
                        ) : (
                          <span className="text-slate-500 font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xl">
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">{player.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white">{player.score}</p>
                        <p className="text-slate-400 text-sm">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
