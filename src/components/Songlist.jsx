// @fortawesome/free-solid-svg-iconsからfaSpinnerアイコンをインポートする
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// @fortawesome/react-fontawesomeからFontAwesomeIconコンポーネントをインポートする
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// SongListコンポーネントを定義する
export function SongList(props) {
  // propsのisLoadingプロパティがtrueの場合、ローディングスピナーを表示する
  if (props.isLoading)
    // 中央に配置されたフレックスボックス内にスピナーを表示
    
    return (
      <div className="inset-0 flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );

  // 20個の仮の曲アイテムを表示する
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {props.songs.map((song) => {
          return (
            <div onClick={() => props.onSongSelected(song)} key={song.id} className="flex-none cursor-pointer ">
              <img
                alt="thumbnail"
                src={
                  song.album.images[0].url
                }
                className="mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">{song.Name}</h3>
              <p className="text-gray-400">By {song.artists[0].name}t</p>
            </div>
          );
        })}
    </div>
  );
}