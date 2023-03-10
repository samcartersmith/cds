# Contentful + go/cds Website Guide

Our documentation website is integrated with Contentful, so designers and non-engineers can modify pages on our doc site from a WYSIWYG editor without having to modify code.

## Create a New Contentful Page on go/cds

See [go/cds-contentful](http://go/cds-contentful)

## Create a Module

We can expose CDS components and compositions to Contentful by turning them into "modules". Add modules to `apps/website/cms/modules` and expose them to contentful via the `componentsMap` object in `apps/website/cms/pages/Page.tsx`. You can test that the module was added successfully by deploying to go/cds-dev using the directions in step 2 of go/cds-contentful.
