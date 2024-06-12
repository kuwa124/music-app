// ReactからuseStateとaudio要素を制御するための機能をインポート
import { useState, useRef } from 'react';

// useSongPlayerカスタムフックを定義
export const useSongPlayer = () => {
  // 再生状態とその状態を更新するための関数をuseStateフックから取得
  const [isPlay, setIsPlay] = useState(false);

  // オーディオ要素への参照を取得するためのuseRefフック
  const audioRef = useRef(null);

  // 選択された曲を処理する非同期関数
  const handleSongSelected = async (song) => {
    // 選択された曲をステートに設定する
    setSelectedSong(song);

    if (song.preview_url != null) {
      // 選択された曲のプレビューURLをオーディオの参照に設定する
      audioRef.current.src = song.preview_url;
      // 曲を再生する
      playSong();
    } else {
      // 曲を一時停止する
      pauseSong();
    }
  };

  // 曲を再生する関数
  const playSong = () => {
    // オーディオを再生する
    audioRef.current.play();
    // プレイ中のステートをtrueに設定する
    setIsPlay(true);
  };

  // 曲を一時停止する関数
  const pauseSong = () => {
    // オーディオを一時停止する
    audioRef.current.pause();
    // プレイ中のステートをfalseに設定する
    setIsPlay(false);
  };

  // 曲の再生/一時停止を切り替える関数
  const toggleSong = () => {
    if (isPlay) {
      // 曲が再生中の場合は一時停止する
      pauseSong();
    } else {
      // 曲が一時停止中の場合は再生する
      playSong();
    }
  };

  // 再生状態、オーディオ要素への参照、曲の選択、再生、一時停止、切り替えの関数を返す
  return {
    isPlay,
    audioRef,
    handleSongSelected,
    playSong,
    pauseSong,
    toggleSong,
  };
};
