# Data files
## About
Currently these files pull data from `useRemoteData.tsx`, however it is possible to do so statically.
This README explains how these files work so you can be best informed on how to edit this repo to suit your needs
<br>
Currently the `.tsx` files that pull remote data outline the arguments they can receive from the R2 server. 
Similarly the original files not pulling from `useRemoteData.tsx` also outlined these arguments, but instead of loading them, wrote them directly to the file. 
## Accepted Arguments of data files
### Certifications 
- name
- issuer
- date
### Education
- school
- program
- dates
- tech
### Experience
- company
- role
- dates
- description
- tech
### Projects
- title
- description
- tech
### Skills
This section is different in that the entire thing is a `const` rather than accepting multiple data ranges.
### Socials
This section appears at the beggining of the site right after the statis header
- id
- label
- href
- icon
### useRemoteData.tsx
The aformentioned `useRemoteData.tsx` controls fetching remote data from R2, I got this working by enabling a public HTTP R2 endpoint on a custom domain.
## Examples of static data sections
I used to use static data sections but I stopped because I wanted a more dynmaic website, however I would like to provide these files as examples for those who many not see the need or wish to have their website dynamically fetch data.
```typescript
export const certifications: Certification[] = [
  {
    name: "PSI GitHub Foundations",
    issuer: "PSI",
    date: "2024",
    link: "https://www.credly.com/go/FZfrOlFD9pvCvNOiGFvTrA",
  },
  {
    name: "AZ-900 Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "2024",
```
↑This is what a snippit of certifications looked like before the change to remote data.
```typescript 
export const CERTIFICATIONS_RESOURCE = "Certifications";

export const certificationsFallback: Certification[] = [];

export const certificationsPlaceholder: Certification[] = [


  {
    name: "Unable to load certifications",
    issuer: "Please try again later.",
    date: "—",
```
↑this is it after, notice the difference? 
<img width="839" height="355" alt="image" src="https://github.com/user-attachments/assets/6bc352a2-099e-49d8-9f80-c9d0fab2a90e" />
<br>
↑ This is the stucture of my R2 Server.
Notice how everything fits together like lego bricks in both the static and dynamic versions of fetching.

My JSON files look like the following 
```json
{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \{\
  "__meta": \{\
    "version": 1,\
    "template": "export type Certification = \{\\n  name: string;\\n  issuer: string;\\n  date: string;\\n  link?: string;\\n\};\\n\\nexport const certifications: Certification[] = __DATA_PLACEHOLDER__certifications_148_396__;",\
    "source": "certifications.ts",\
    "entries": [\
      \{\
        "name": "certifications",\
        "placeholder": "__DATA_PLACEHOLDER__certifications_148_396__",\
        "baseIndent": ""\
      \}\
    ],\
    "generatedAt": "2025-10-02T05:38:59.638Z"\
  \},\
  "certifications": [\
    \{\
      "name": "PSI GitHub Foundations",\
      "issuer": "PSI",\
      "date": "2024",\
      "link": "https://www.credly.com/go/FZfrOlFD9pvCvNOiGFvTrA"\
    \},\
    \{\
      "name": "AZ-900 Microsoft Azure Fundamentals",\
      "issuer": "Microsoft",\
      "date": "2024"\
    \}\
  ]\
\}}
```
↑There is a bit of extra info here defining things like placeholders hiding some extra info here that the original static files had, etc.
<hr>
<br>
With this knowledge you could make any part of your website dynamic with ease. 
