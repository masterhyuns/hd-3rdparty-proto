import {useEffect, useRef, useState} from "react";
import {ContentsPlayerApi} from "./ContentsPlayerApi";
import {ContentsPlayerFactory} from "./ContentsPlayerFactory";

const useContentsPlayer = () => {
	const playerRef = useRef<HTMLIFrameElement>(null);
	const [player, setPlayer] = useState<ContentsPlayerApi>()
	
	
	useEffect(() => {
		console.log('player ref changed')
			if ( playerRef && playerRef.current ){
				playerRef.current.addEventListener("load", (e:any) => {
					console.log("iframe 문서가 로드 또는 변경되었습니다.");
					if ( playerRef && playerRef.current && playerRef.current.contentWindow ) {
						if (!player || !player.isInit()) {
							let contentPlayer = ContentsPlayerFactory.create(playerRef.current.contentWindow);
							console.log('contentPlayer1', playerRef.current.contentWindow.API)
							if (contentPlayer) {
								console.log('contentPlayer2')
								setPlayer(contentPlayer)
								player?.init()
							}
						}
					}
				});
			}
	}, [playerRef]);
	
	return {
		ref: playerRef,
		player: player,
	}
};

export default useContentsPlayer;
