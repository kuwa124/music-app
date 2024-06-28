// ReactからuseStateをインポート
import { useState } from 'react';
// Spotify APIを利用するためのspotifyモジュールをインポート
import spotify from '../lib/spotify';

import { usePagination } from './useSelectedSong';

export const useSearch = () => {
  // 1ページあたりの曲の数を定義
  const limit = 20;
  // ローディング状態とその状態を設定するためのuseStateフック
  const [isLoading, setIsLoading] = useState(false);
  // 検索キーワードの状態とその状態を更新するための関数をuseStateフックから取得
  const [keyword, setKeyword] = useState('');
  // 検索結果の曲の状態とその状態を更新するための関数をuseStateフックから取得
  const [searchedSongs, setSearchedSongs] = useState();
  // 次のページがあるかどうかの状態とその更新関数
  const [hasNext, setHasNext] = useState(false);
  // 前のページがあるかどうかの状態とその更新関数
  const [hasPrev, setHasPrev] = useState(false);

  // 現在のページ番号の状態とその状態を更新するための関数をuseStateフックから取得
  const [page, setPage] = useState(1);

  // 曲を検索する非同期関数
  const searchSongs = async (page) => {
    // ローディング状態をtrueに設定
    setIsLoading(true);
    // ページ番号からオフセットを計算
    const offset = parseInt(page) ? (parseInt(page) - 1) * limit : 0;
    // Spotify APIを使用して曲を検索する
    const result = await spotify.searchSongs(keyword, limit, offset);
    // 次のページがあるかどうかを設定
    setHasNext(result.next != null);
    // 前のページがあるかどうかを設定
    setHasPrev(result.previous != null);
    // 検索結果をコンソールに出力（デバッグ用）
    console.log(result);
    // 検索結果の曲をステートに設定する
    setSearchedSongs(result.items);
    // ローディング状態をfalseに設定
    setIsLoading(false);
  };

  // 次のページに移動する非同期関数
  const moveToNext = async () => {
    // 次のページ番号を計算
    const nextPage = page + 1;
    // 次のページの検索結果を取得
    await searchSongs(nextPage);
    // ページ番号をステートに設定
    setPage(nextPage);
  };

  // 前のページに移動する非同期関数
  const moveToPrev = async () => {
    // 前のページ番号を計算
    const prevPage = page - 1;
    // 前のページの検索結果を取得
    await searchSongs(prevPage);
    // ページ番号をステートに設定
    setPage(prevPage);
  };

  return {
    isLoading,
    searchedSongs,
    setKeyword,
    searchSongs,
    hasNext,
    hasPrev,
    moveToNext,
    moveToPrev,
  };
};
