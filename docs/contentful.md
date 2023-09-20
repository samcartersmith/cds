# Contentful + go/cds Website Guide

Our documentation website is integrated with Contentful, so designers and non-engineers can modify pages on our doc site from a WYSIWYG editor without having to modify code.

## Create a New Contentful Page on go/cds

See [go/cds-contentful](http://go/cds-contentful)

## Create a Module

We can expose CDS components and compositions to Contentful by turning them into "modules". Add modules to `apps/website/cms` in either the `modules` or `misc` directories (see below what the difference is) and expose them to contentful via the `componentsMap` object in `apps/website/cms/componentsMap`. You can test that the module was added successfully by deploying to [go/cds-dev](http://go/cds-dev) using the directions in step 2 of [go/cds-contentful](http://go/cds-contentful).

There are two content types in Contentful that are used to create reusable UI components that designers can use when building out pages in Contentful (located in the CMS directory `apps/website/cms`):

- **Modules** components that have specialized styling intended to be used for a specific purpose, eg: `DoDont`.
- **Misc** reusable components that have generic styling intended to be used for a variety of purposes, eg: `Link`.

See [this presentation](https://docs.google.com/presentation/d/1s0WuhcWE3SuangGxCNN5Pg4t7JZPyJfpz6AB7dgPhmE/edit#slide=id.g14700eabb31_0_2) for more details on these types of content.

Whenever you create a new content type you must also configure it in Contentful under the "Content Model" section.
