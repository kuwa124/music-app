// ReactからuseEffectとuseStateをインポート
import { useEffect, useState } from "react";
// SongListコンポーネントをインポート
import { SongList } from "./components/Songlist";
// Spotify APIを利用するためのspotifyモジュールをインポート
import spotify from "./lib/spotify";
import { useRef } from "react";
import { Player } from "./components/player";

// Appコンポーネントの定義
export default function App() {
  // ローディング状態とその状態を設定するためのuseStateフック
  const [isLoading, setIsLoading] = useState(false);
  // 人気のある曲とその状態を設定するためのuseStateフック
  const [popularSongs, setPopularSongs] = useState([]); 

// isPlayの状態とその状態を更新するための関数をuseStateフックから取得
// isPlayは現在の再生状態を示す(true = 再生中, false = 停止中)
const [isPlay, setIsPlay] = useState(false);

// selectedSongの状態とその状態を更新するための関数をuseStateフックから取得
// selectedSongには現在選択されている曲の情報が格納される
const [selectedSong, setSelectedSong] = useState();
  const audioRef = useRef(null);
  // コンポーネントがマウントされた時に実行されるuseEffectフック
  useEffect(() => {
    // 人気のある曲を取得する関数を呼び出す
    fetchPopularSongs();
  }, []);

  // 人気のある曲を取得する関数
  const fetchPopularSongs = async () => { 
    // ローディング状態をtrueに設定
    setIsLoading(true);
    // Spotify APIから人気のある曲を取得
    const result = await spotify.getPopularSongs();
    // 取得した曲の情報からトラック情報のみを抽出
    const popularSongs = result.items.map((item) => {
      return item.track;
    });
    // 人気のある曲の状態を更新
    setPopularSongs(popularSongs);
    // ローディング状態をfalseに設定
    setIsLoading(false);
  };


// 選択された曲を処理する非同期関数
const handleSongSelected = async (song) => {
  // 選択された曲をステートに設定する
  setSelectedSong(song);

  if (song.preview_url != null) {
    // 選択された曲のプレビューURLをオーディオの参照に設定する
    audioRef.current.src = song.preview_url;
    playSong();
  } else {
    pauseSong();
  }
  
};
  
  const playSong = () => {
    // オーディオを再生する
    audioRef.current.play();
    // プレイ中のステートをtrueに設定する
    setIsPlay(true);
  };

  const pauseSong = () => {
    // オーディオを再生する
    audioRef.current.pause();
    // プレイ中のステートをtrueに設定する
    setIsPlay(false);
  };

  const toggleSong = () => {
    if (isPlay) {
      pauseSong()
    } else {
      playSong()  
    }
  };

  // アプリケーションのレイアウトを定義
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          {/* SongListコンポーネントを表示し、ローディング状態と人気のある曲を渡す */}
          <SongList
            isLoading={isLoading}
            songs={popularSongs}
            onSongSelected={handleSongSelected}>
          </SongList>
        </section>
      </main>
      {selectedSong != null && <Player song={selectedSong} isPlay={isPlay} onButtonClick={toggleSong} />}
      <audio ref={audioRef} />
    </div>
  );
}