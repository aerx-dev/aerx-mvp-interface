import { Layout } from "antd";
import { useState, useEffect } from "react";
import { nearStore } from "../../../stores/near";
import Collections from "../Collections";
import NFTCard  from "./NFTCard";
import { useRouter } from 'next/router'

const { Header, Sider, Content, Footer } = Layout;

export default function SideBar({  children, bg, state }) {
	const router = useRouter();
  	const profiledlooker = router.query
	const [isCollapsed, setIsCollapsed] = useState(false);
	console.log("state",state);
	console.log("viewed",profiledlooker.profiledid);
	const nearState = nearStore((state) => state);
	const [currentProfileview, setCurrentProfileview] = useState();
	useEffect(() => {
		async function get_current_profileview() {
			var res = await nearState.pnftContract.profile_by_id({
                	user_id: nearState.accountId,
                	user_to_find_id: profiledlooker.profiledid,
            	});

           	 setCurrentProfileview(res);
            // return res;
            
        	}
        	get_current_profileview();
    	}, [nearState, nearState.accountId, nearState.pnftContract, profiledlooker.profiledid]);
	console.log('currentProfileview', {currentProfileview});

	return (
		<div>
        		<div className="grid grid-cols-12 gap-x-10 mx-10 dippy dippycontent sm:dippy md:griddy">																																																																																																																																		<div
                		className="col-start-1 col-span-3 flex flex-col items-center min-h-full"
                		trigger={null}
            		>    
            		<NFTCard
                    		profile={currentProfileview}
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
