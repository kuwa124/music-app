// ReactからuseEffectとuseStateをインポート
import { useEffect, useState } from 'react';
// Spotify APIを利用するためのspotifyモジュールをインポート
import spotify from '../lib/spotify';

// 人気の曲を取得するためのカスタムフック
export const usePopularSongs = () => {
  // ローディング状態とその状態を設定するためのuseStateフック
  const [isLoading, setIsLoading] = useState(false);
  // 人気のある曲とその状態を設定するためのuseStateフック
  const [popularSongs, setPopularSongs] = useState([]);

  // コンポーネントがマウントされた時に実行されるuseEffectフック
  useEffect(() => {
    // 人気のある曲を取得する関数を呼び出す
    fetchPopularSongs();
  }, []);

  // 人気のある曲を取得する非同期関数
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

  // 必要な状態と関数をオブジェクトとして返す
  return { isLoading, setIsLoading, popularSongs };
};
