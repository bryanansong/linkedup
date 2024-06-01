const OutreachMessagesButton = () => {
	// TODO: Replace this with correct URL
	const outreachMessagesUrl = "www.bryanansong.com";
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
