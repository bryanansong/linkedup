const OutreachMessagesButton = () => {
	const outreachMessagesUrl =
		"https://roasted-gastonia-25f.notion.site/LinkedUp-Networking-Connection-Messages-1e89f246fd4047dda39d2e35c1f478a5?pvs=4";
	return (
		<div
			className="outreach-messages-button"
			onClick={() => {
				chrome.tabs.create({ url: outreachMessagesUrl });
			}}
		>
			Template Outreach Messages
		</div>
	);
};

export default OutreachMessagesButton;
