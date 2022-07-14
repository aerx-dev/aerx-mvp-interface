import { useState } from "react";
import NFTCard from "./NFTCard";
import ReactCardFlip from "react-card-flip";
import Exchange from "../Exchange";
import { NearStoreType } from "../../../types/stores";

export type SideBarProps = {
    bg: string;
    nearState: NearStoreType;
};

const SideBar = ({ bg, nearState }: SideBarProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flip = () => setIsFlipped(!isFlipped);

    // To switch Send and Exchange component on the back side of flip
    const [toSend, setToSend] = useState(true);

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <NFTCard
                profile={nearState?.profile}
                balance={nearState?.aexBalance}
                bg={bg}
                flip={flip}
                setToSend={setToSend}
            />
            {toSend ? (
                // TODO: switch to Send Component
                <Exchange balance={100} flip={flip} />
            ) : (
                <Exchange balance={100} flip={flip} />
            )}
        </ReactCardFlip>
    );
};

export default SideBar;
