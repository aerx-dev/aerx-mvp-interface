# AERX MONETIZED SOCIAL MEDIA PLATFORM

> This application is a decentralized social media platform, where users can monetized their posts, create NFT from their profile, etc

## The project is split into various directories for easier identification and code readability

### Components Directory

- Account Directory contains 2 files, ie. 1. Form for getting user data from client side and 2. Index for the entry point of our account components
- Header Directory for presenting to the user the navigation links for a better UI/UX
- Landing Directory for the entry point of the application without authentication or authorisation
- Profile Directory contains everything about the user or registered user
- UI Directory contains the reuseable components for cards and icon buttons

### Pages Directory

- This directory contains the main pages of our application. We have the following pages
- Account
- Feed
- Profile

### Lib directory

- This directory contains all the backend smart contract that the UI or Client side interacts with. We have the following: 1. Auth 2. NFTContract 3. TokenContract 4. Configuration . Model which contains the PrfoileNFTMetadata

### Locales

- This directory contains all the languages we have set up. We can easily translate the language of our choice with the help of the locales directory

### Public

- This is the public directory, in this directory we have access to our files or assets on the go

### Stores directory

- This directory helps us manages state of the application with the help of the "create" method of "zustand" state management library

## Built With

- React
- Styled Components
- NEAR API JS
- Next Translate
- Zustand
- IPFS Core
- React Icons

### Prerequisites

- Nodejs
- NPM
- Linux commands

## Live Demo

[aerx](https://aerx-2.vercel.app/)

# Browser side IPFS deployment :open_file_folder:

Deploy your files via a browserside local IPFS node.
The CID url is displayed on success.

## Getting Started

To get a local copy up and running follow these simple example steps.

1. `git clone https://github.com/AERX-dev/aerx-frontend-near.git`
2. `cd readme-addo`
3. `npm i`
4. `npm run dev`

### Contributing

[contributing](https://github.com/ethereum-boilerplate/ethereum-boilerplate/blob/main/CONTRIBUTING.md)

# Acknowledgments

- Got most of the code from [here 🗻](https://github.com/ipfs-examples/js-ipfs-examples/)
- AERX DEV TEAM
- etc


## 📝 License

This project is [Apache](lic.url) licensed.
