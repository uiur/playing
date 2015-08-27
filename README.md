# playing
[![Build Status](https://travis-ci.org/uiureo/playing.svg)](https://travis-ci.org/uiureo/playing)

work in progress.

Send what you're playing on iTunes to Slack or Hipchat.

![](https://i.gyazo.com/45f1d6119fbd92349c935e912a7b2309.png)

## Usage
### Slack
Set `SLACK_TOKEN`.

```sh
npm install
SLACK_TOKEN=room npm start
```

### Hipchat
You must set `HIPCHAT_ROOM` and `HIPCHAT_TOKEN`.

You cat get token from this link. https://hipchat.com/account/api

```sh
npm install
HIPCHAT_ROOM=room HIPCHAT_TOKEN=token npm start
```
