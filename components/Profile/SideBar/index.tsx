import { Layout } from "antd";
import { useState } from "react";
import Collections from "../Collections";
import NFTCard from "./NFTCard";
import ReactCardFlip from "react-card-flip";
import Exchange from "../Exchange";
import { ReactNode } from "react";
import { NearStoreType } from "../../../types/stores";

const { Header, Sider, Content, Footer } = Layout;

export type SideBarProps = {
    bg: string;
    nearState: NearStoreType;
};

const SideBar = ({ bg, nearState }: SideBarProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flip = () => setIsFlipped(!isFlipped);

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <NFTCard
                profile={nearState?.profile}
                balance={nearState?.aexBalance}
                bg={bg}
                flip={flip}
            />
            <Exchange balance={100} flip={flip} />
        </ReactCardFlip>
    );
};

export default SideBar;
