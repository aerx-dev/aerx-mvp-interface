import { Layout } from "antd";
import { useState } from "react";
import Collections from "../Collections";
import NFTCard  from "./NFTCard";

const { Header, Sider, Content, Footer } = Layout;

export default function SideBar({ children, bg, state }) {

    const [isCollapsed, setIsCollapsed] = useState(false);    
    console.log(state);

    return (
	<div>
        <div className="grid grid-cols-12 gap-x-10 mx-10 dippy sm:dippy md:griddy">																																																																																																																																		<div
                className="col-start-1 col-span-3 flex flex-col items-center min-h-full"
                trigger={null}
            >    
            <NFTCard
                    profile={state?.profile}
                    balance={state?.aexBalance}
                    bg={bg}
                    className="sticky top-20 min-h-max min-w-full"
                />        
        </div>																																																					
        <div className="col-start-4 col-span-6 flex flex-col items-center">
            <Content className="min-w-full">{children}</Content>
        </div>
        <div className="col-start-10 col-span-3 flex flex-col items-center">
            <Collections
                collapse={[isCollapsed, setIsCollapsed]}
                className="min-w-full"
            />
        </div>            
        </div>
	<div className="items-center md:dippy">
                <Content className="min-w-full">{children}</Content>
        </div>
	</div>
    );
}
