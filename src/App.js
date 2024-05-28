// ReactからuseEffectとuseStateをインポート
import { useEffect, useState } from "react";
// SongListコンポーネントをインポート
import { SongList } from "./components/Songlist";
// Spotify APIを利用するためのspotifyモジュールをインポート
import spotify from "./lib/spotify";

// Appコンポーネントの定義
export default function App() {
  // ローディング状態とその状態を設定するためのuseStateフック
  const { isLoading, setIsLoading } = useState(false);
  // 人気のある曲とその状態を設定するためのuseStateフック
  const { popularSongs, setPopularSongs } = useState([]); 
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
          <SongList isLoading={isLoading} songs={popularSongs}></SongList>
        </section>
      </main>
    </div>
  );
}