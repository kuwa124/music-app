// React の useState と useEffect フックをインポート
import { useState, useEffect } from 'react';
// Spotify API を利用するためのサービスをインポート
import spotify from '../services/spotifyService';

// usePopularSongs カスタムフックをエクスポート
export const usePopularSongs = () => {
  // 人気のある曲の状態と更新関数を useState で初期化
  const [popularSongs, setPopularSongs] = useState([]);
  // ローディング状態と更新関数を useState で初期化
  const [isLoading, setIsLoading] = useState(false);

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

  // 人気のある曲の状態とローディング状態を返す
  return { popularSongs, setPopularSongs, isLoading, setIsLoading };
};
