const Header = () => {
	return (
		<>
			<h1
				className="logo-text"
				onClick={() => {
					chrome.tabs.create({
						url: "https://chromewebstore.google.com/detail/linkedup/kbnclglbilajgngicamjdmgmlpgfeiik",
					});
				}}
				style={{ cursor: "pointer" }}
			>
				Linked<span>Up</span>
			</h1>
		</>
	);
};

export default Header;
