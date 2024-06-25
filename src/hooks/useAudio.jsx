// Reactのuserefとusestate Hooksをインポート
import { useRef, useState } from 'react';

// オーディオ再生に関する機能をまとめたカスタムフック
export const useAudio = () => {
  // 再生状態を管理するstate
  const [isPlay, setIsPlay] = useState(false);

  // オーディオ要素への参照を作成
  const audioRef = useRef(null);

  // 曲を再生する関数
  const playSong = () => {
    // オーディオを再生
    audioRef.current.play();
    // 再生状態をtrueに設定
    setIsPlay(true);
  };

  // 曲を一時停止する関数
  const pauseSong = () => {
    // オーディオを一時停止
    audioRef.current.pause();
    // 再生状態をfalseに設定
    setIsPlay(false);
  };

  // 必要な状態と関数をオブジェクトとして返す
  return { isPlay, setIsPlay, audioRef, playSong, pauseSong };
};
