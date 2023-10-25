import React from 'react';

import { Grid } from 'semantic-ui-react';

type SiteExplain = {
  viewEng: boolean;
};
const SiteExplain: React.FC<SiteExplain> = ({ viewEng }) => {
	return (
		<Grid.Row verticalAlign="middle">
			<div>
				<div style={{ lineHeight: 2 }}>
					{viewEng
						? 'Please choose the photo you are most interested in.'
						: '一番気になる写真を選んでみてください。'}
				</div>
				<div style={{ lineHeight: 2 }}>
					{viewEng
						? 'It may reveal your state of mind.'
						: 'あなたの心理状態がわかるかも。'}
				</div>
			</div>
		</Grid.Row>
	);
};

export default SiteExplain;
