# SellScaleHood

## Context
At SellScale, we’re here to redefine how businesses grow revenue. We're building the future of sales with cutting-edge AI and NLP tools. From enhancing sales outreach strategies that existed pre-AI, to hacking new, previously unimaginable ways to grow revenue - you will contribute directly to growth. Today, our tools empower sales teams and founders, helping move millions of dollars in revenue.

## App
We are going to be building a simple version of Robinhood (web client). This is going to require setting up a basic backend server, frontend application, and some sort of data storage (database or file storage are both acceptable).

**The app is expected to be able to do three things:**

1. “Query” for specific stock tickers (i.e. search for $AAPL, $TSLA). Powered by [yfinance](https://pypi.org/project/yfinance/) library
2. “Buy” and “Sell” specific stock tickers (i.e. enter ticker, quantity, and save the amount somewhere in a database)
3. “View Portfolio” and see a list of all previously bought stock tickers.

**In order to build these, we are expecting three core pieces:**

1. A REST API built using Flask Python SDK. Build necessary endpoints to complete challenge
2. A React JS frontend application to interact with application (use Typescript if possible!)
3. Some sort of database of your choice (PSQL, file storage, mongoDB, firebase, etc)

The ideal deliverable will be simple, elegant, and functional. Bonus points if it looks nice with a cool design!

## Resources
Use these resources as starting points when working on this challenge! Also, feel free to Google around and find anything you need on StackOverflow/online when building!

- Stock API: yfinance: https://pypi.org/project/yfinance/
- Flask Documentation: https://flask.palletsprojects.com/en/2.2.x/
- React Documentation: https://reactjs.org/docs/getting-started.html
- Create React App: https://create-react-app.dev/
- Dribble UI Inspiration: https://dribbble.com/search/robinhood-app
- Typescript Documentation: https://www.typescriptlang.org/docs/

## Checklist
Here are the things we will be looking for, explicitly, when reviewing your deliverable. Be sure to mention how all of these are addressed in your Loom video.

**User Checklist**

- [ ]  Can I search up / look up a stock? Show me how.
- [ ]  Can I ‘buy’ a stock? How?
- [ ]  Can I ‘sell’ a stock? How?
- [ ]  Can I see where the stocks I purchase show up? What does the portfolio look like?

**Technical Checklist**

- [ ]  Is the frontend built with React / Javascript?
- [ ]  Is the backend built with Python / (Flask or Django)?
- [ ]  Does the backend implementation leverage the ‘YFinance’ API?
- [ ]  Does the UI resemble a stock trading app that a user would typically use?
