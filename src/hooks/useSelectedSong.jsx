// ReactからuseStateをインポート
import { useState } from 'react';

// useAudioカスタムフックをインポート
import { useAudio } from './useAudio';

// 選択された曲の管理のためのフック
export const useSelectedSong = () => {
  // 選択された曲の状態とその状態を更新するための関数をuseStateフックから取得
  const [selectedSong, setSelectedSong] = useState();

  // useAudioフックから必要な状態と関数を取得
  const { isPlay, audioRef, playSong, pauseSong } = useAudio();

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
  return {
    selectedSong,
    isPlay,
    audioRef,
    handleSongSelected,
    toggleSong,
  };
};
