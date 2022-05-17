---
title: HTML to PDF with GoLang
date: "2022-05-16T22:12:03.284Z"
layout: post
draft: false
path: "/posts/html-to-pdf-with-golang/"
category: "Go-Lang"
tags:
  - "Go-Lang"
  - "HTML"
  - "PDF"
  - "wkhtmltopdf"
description: "Convert HTML to PDF with GoLang using wkhtmltopdf"
---

The easiet way to format and create PDFs is to write them first as HTML and then convert them to PDF. wkhtmltopdf is a command line tool that let's you do this. Let's do it with GoLang.

First, you start with an html template. This template could as well be a file on your computer.

```go
htmlTemplate := `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>{{.FirstName}} {{.LastName}}</h1>
        <p>{{.JobTitle}}</p>

        <h2>Skills</h2>
        <ul>
            {{range .Skills}}
            <li>{{.}}</li>
            {{end}}
        </ul>
    </body>
    </html>
`
```

And a struct that will be used to populate the html template. 

```go
type Person struct {
	FirstName string
	LastName  string
	JobTitle  string
	Skills    []string
}
```

Next, generate an in-memory HTML buffer using the `html/template` package.

```go
var htmlBuffer bytes.Buffer
err := template.Must(template.New("html").
    Parse(htmlTemplate)).
    Execute(&htmlBuffer, person)
```

person is a pointer to a Person struct. 


Once you have the HTML buffer, you can convert it to PDF using [github.com/SebastiaanKlippert/go-wkhtmltopdf](https://github.com/SebastiaanKlippert/go-wkhtmltopdf). This package is just a wrapper around wkhtmltopdf.

```go
pdfGen, _ := wkhtmltopdf.NewPDFGenerator()
page := wkhtmltopdf.NewPageReader(bytes.NewReader(htmlBuffer.Bytes()))
pdfGen.AddPage(page)
pdfGen.WriteFile("test.pdf")
```

_The above snippet will convert the HTML buffer to a PDF._

## Putting it all together

I have created [github.com/theterminalguy/wkhtmltopdf-golang-docker](https://github.com/theterminalguy/wkhtmltopdf-golang-docker) that contains a production ready dockerized example. Feel free to use it as a starting point for your own projects.
