# AERX

> aerx is a decentralized social media platform, where users can monetized their posts, create NFT contents, etc

## Website

Check out the lastest buld of [AERX](aerx-near.netlify.app).

## Badges

![GitHub language count](https://img.shields.io/github/languages/count/AERX-dev/aerx-frontend-near?style=for-the-badge&color=magenta)
![GitHub top language](https://img.shields.io/github/languages/top/AERX-dev/aerx-frontend-near?style=for-the-badge&color=red)
![Lines of code](https://img.shields.io/tokei/lines/github/AERX-dev/aerx-frontend-near?style=for-the-badge&color=orange)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/AERX-dev/aerx-frontend-near?color=lightblue&style=for-the-badge)


## Getting Started

1. `git clone https://github.com/AERX-dev/aerx-frontend-near.git`
2. `cd aerx-frontend-near`
3. `npm install`
4. `npm run dev`

### Prerequisites

-   Nodejs
-   NPM

## The project directories overview

### Components Directory

-   Account Directory contains 2 files, ie. 1. Form for getting user data from client side and 2. Index for the entry point of our account components
-   Header Directory navigation
-   Landing Directory for the entry point of the application
-   Profile Directory contains profile of the registered user
-   UI Directory contains the reuseable components for cards and icon buttons

### Pages Directory

-   This directory contains the main pages of our application. We have the following pages
    -   Account
    -   Feed
    -   Profile

### [hooks](./hooks)

Contains our custom hooks. The IFPS hook helps placing content on through the ipfs gateway. More [beautiful hooks](https://github.com/antonioru/beautiful-react-hooks) are available 🖌️

### Lib directory

-   This directory contains the following: 1. Auth 2. NFTContract 3. TokenContract 4. Configuration. Model which contains the PrfoileNFTMetadata

The auth file starts up an IPFS node, logs into the NEAR account and gives permission to the contracts.
TODO:
 - to mint an NFT, you need to send the mint rquest from the nft-contract accountId.
 - That means it gets payed by the NFT account.
 - SHould we change that in the contract or just have it pay for the minting for now?

### Locales

-   This directory contains all the languages we have set up. Easily translate the application across multiple languages

### Public

-   This is the public directory

### Stores directory

-   This directory helps us manages state of the application with the help of the "create" method of "zustand" state management library

## Built With

-   React
-   Styled Components
-   NEAR API JS
-   Next Translate
-   Zustand
-   IPFS Core
-   React Icons

## Storyboard

Storyboard is set up following this [tutorial](https://storybook.js.org/blog/get-started-with-storybook-and-next-js/) and the [chakra-ui settings](https://chakra-ui.com/guides/integrations/with-storybook).


Place your `.stories.js` in `./stories` and Start the stroyboard server:
```bash
npm run storyboard
```

## Browser side IPFS deployment

Deploy your files via a browserside local IPFS node.
The CID and URI is returned on success.

### Contributing

[contributing](CONTRIBUTING.md)

## Acknowledgments

-   IPFS reference [here 🗻](https://github.com/ipfs-examples/js-ipfs-examples/)

<!-- ## 📝 License -->

<!-- This project is [Apache](lic.url) licensed. -->
