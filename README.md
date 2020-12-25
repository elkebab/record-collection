## General

Simple app to show collection of kits.

### [Demo](https://mokkelgjerd.no/drakter)

## Setup

This project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Get started locally by running `npm i` followed by `npm start`.

Local `.env` file needs needs the following entries:
| `REACT_APP_DOC_ID` | Document ID in [https://jsoneditoronline.org/](https://jsoneditoronline.org/), which currently serves as a very simple API. |
| `REACT_APP_TRANSLOADIT_KEY` | Key to Transloadit App |
| `REACT_APP_TRANSLOADIT_TEMPLATE` | Template ID in Transloadit, which will process files being uploaded (resize, compress, save to Dropbox, etc) |

## Potential Future Work

- Mobile UX (toggle filters, etc)
- Use Redux or React Context to avoid sending data and functions everywhere as props
- Authentication, etc.
