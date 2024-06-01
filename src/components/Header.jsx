const Header = ({ toggleDarkMode }) => {
	return (
		<div className="header-container">
			<div className="header">
				<button
					className="dark-mode-toggle"
					onClick={toggleDarkMode}
				>
					{document.body.classList.contains("dark-mode") ? (
						<svg
							width="25"
							height="25"
							viewBox="0 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.4999 2.08331V4.16665M12.4999 20.8333V22.9166M4.16659 12.5H2.08325M6.57712 6.57718L5.10398 5.10404M18.4227 6.57718L19.8959 5.10404M6.57712 18.4271L5.10398 19.9002M18.4227 18.4271L19.8959 19.9002M22.9166 12.5H20.8333M17.7083 12.5C17.7083 15.3765 15.3764 17.7083 12.4999 17.7083C9.62344 17.7083 7.29159 15.3765 7.29159 12.5C7.29159 9.6235 9.62344 7.29165 12.4999 7.29165C15.3764 7.29165 17.7083 9.6235 17.7083 12.5Z"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : (
						<svg
							width="25"
							height="25"
							viewBox="0 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.8695 13.4965C21.4353 16.0124 18.7282 17.7087 15.6249 17.7087C11.0225 17.7087 7.29159 13.9777 7.29159 9.37533C7.29159 6.27182 8.98812 3.56457 11.5044 2.13037C6.2184 2.63156 2.08325 7.08291 2.08325 12.5001C2.08325 18.253 6.74695 22.9167 12.4999 22.9167C17.9168 22.9167 22.368 18.782 22.8695 13.4965Z"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</button>
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
			</div>
		</div>
	);
};

export default Header;
