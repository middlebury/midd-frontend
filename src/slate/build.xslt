<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:fw="http://technolutions.com/framework" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="xhtml">
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <template path="/shared/base.xslt" xmlns="http://technolutions.com/framework" />
      <head>
        <!-- <link href="/shared/build-fonts.css?v=20150807174311" rel="stylesheet" /> -->
        <link href="/midd.css?v=20150807174311b" rel="stylesheet" />
        <link rel="stylesheet" media="all" href="//cloud.typography.com/83898/706148/css/fonts.css"/>
        <!-- <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Domine:700,regular|Open+Sans:300,700,700italic,italic,regular|Rosarivo:italic,regular&amp;subset=latin-ext" media="all" class="cr" /> -->
        <xsl:apply-templates select="xhtml:html/xhtml:head/node()" />
      </head>
      <body>
        <xsl:copy-of select="xhtml:html/xhtml:body/@*" />

          <nav aria-labelledby="midd-skip-link">
            <a href="#midd-main" class="sr-only sr-focusable" id="midd-skip-link">
              Skip to content
            </a>
          </nav>

          <header class="school-header js-headroom">

            <div class="container">

              <div class="school-header__main">

                <div class="school-header__logo">
                  <a href="http://middlebury.edu/" target="_blank">
                    <img src="/college-logo.svg?fv=pvm5tt"
                      srcset="/college-logo.svg?fv=pvm5tt 180w"
                      sizes="(min-width: 1280px) 180px, 120px" alt="Logo for Middlebury College" />
                    <span class="sr-only">Middlebury College</span>
                  </a>
                </div>

                <div class="school-header__content">

                  <div class="school-nav">

                    <button class="school-nav__handle" data-drawer="midd-nav-drawer" aria-label="Open navigation">
                      <svg class="icon mr-1" focusable="false" aria-hidden="true" width="24" height="24" fill-rule="evenodd" viewBox="0 0 24 24"><path d="M0 19h24v2H0zM0 11h24v2H0zM0 3h24v2H0z"/></svg>
                      <span class="d-none d-sm-inline">Menu</span>
                    </button>

                    <div class="school-nav__menu">

                      <nav aria-labelledby="midd-main-nav-label">
                        <h2 class="sr-only" id="midd-main-nav-label">Main navigation</h2>
                        <ul class="school-nav__list">
                          <li class="school-nav__item">
                            <a href="http://middlebury.edu/college/admissions" class="school-nav__link school-nav__link--top" target="_blank">Admissions</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="http://www.middlebury.edu/academics"
                              class="school-nav__link school-nav__link--top" target="_blank">Academics</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="http://www.middlebury.edu/student-life"
                              class="school-nav__link school-nav__link--top" target="_blank">Student Life</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="https://athletics.middlebury.edu/landing/index"
                              class="school-nav__link school-nav__link--top" target="_blank">Athletics</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="http://www.middlebury.edu/arts" class="school-nav__link school-nav__link--top" target="_blank">Arts</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="http://www.middlebury.edu/international"
                              class="school-nav__link school-nav__link--top" target="_blank">Middlebury International</a>
                          </li>

                          <li class="school-nav__item d-none d-xl-block">
                            <a href="http://middlebury.edu/search" class="school-search__handle" target="_blank">
                              <svg class="icon mr-1 school-search__mag" focusable="false" aria-hidden="true" width="24" height="24" fill-rule="evenodd" viewBox="0 0 24 24"><path d="M17.193 18.59A10.457 10.457 0 0 1 10.5 21C4.701 21 0 16.299 0 10.5S4.701 0 10.5 0 21 4.701 21 10.5c0 2.544-.904 4.876-2.41 6.693.041.03.08.063.117.1l5.013 5.013a1 1 0 0 1-1.414 1.414l-5.013-5.013a1.008 1.008 0 0 1-.1-.116zM10.5 19a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z" fill-rule="nonzero"/></svg>
                              Search
                            </a>
                          </li>
                        </ul>
                      </nav>

                      <nav aria-labelledby="midd-secondary-nav-label">
                        <h2 class="sr-only" id="midd-secondary-nav-label">Secondary navigation</h2>
                        <ul class="school-nav__list">
                          <li class="school-nav__item">
                            <a href="http://www.middlebury.edu/newsroom"
                              class="school-nav__link school-nav__link--util" target="_blank">Newsroom</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="http://www.middlebury.edu/events" class="school-nav__link school-nav__link--util" target="_blank">Calendar of
                              Events</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="https://www.middlebury.edu/office/" class="school-nav__link school-nav__link--util" target="_blank">Offices
                              and Services</a>
                          </li>
                          <li class="school-nav__item">
                            <a href="http://www.middlebury.edu/giving" class="school-nav__link school-nav__link--util" target="_blank">Giving</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div class="school-search">
                    <a href="http://middlebury.edu/search" class="school-search__handle d-xl-none" target="_blank">
                      <svg class="icon mr-1 school-search__mag" focusable="false" aria-hidden="true" width="24" height="24" fill-rule="evenodd" viewBox="0 0 24 24"><path d="M17.193 18.59A10.457 10.457 0 0 1 10.5 21C4.701 21 0 16.299 0 10.5S4.701 0 10.5 0 21 4.701 21 10.5c0 2.544-.904 4.876-2.41 6.693.041.03.08.063.117.1l5.013 5.013a1 1 0 0 1-1.414 1.414l-5.013-5.013a1.008 1.008 0 0 1-.1-.116zM10.5 19a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z" fill-rule="nonzero"/></svg>
                      <span class="d-none d-sm-inline">Search</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </header>


          <main class="main">
            <div class="container pt-3">
              <article id="c_main-content" class="c_pagecontent c_container cr">
                <section class="c_page cr">
                  <section class="c_body cr">
                    <div id="global" style="">
                    </div>
                    <div id="content" class="p-3">
                      <xsl:apply-templates select="xhtml:html/xhtml:body/node()" />
                    </div>
                  </section>
                </section>
                <div class="c_clear cr" />
              </article>
            </div>
          </main>

          <footer class="midd-footer">
            <h2 class="sr-only">Additional Navigation</h2>
            <div class="container">
              <div class="row">
                <div class="col-lg-3">
                  <div class="mb-4 mb-lg-0">
                    <a href="https://www.middlebury.edu" target="_blank">
                      <img src="/images/middlebury-logo-white.svg" alt="Middlebury" width="195" height="71"/>
                    </a>
                  </div>
                </div>
                <div class="col-lg-9">
                  <ul class="midd-footer__list">
                    <li class="midd-footer__item">
                      <a href="http://www.middlebury.edu/about" class="midd-footer__link" target="_blank">About Middlebury</a>
                    </li>
                    <li class="midd-footer__item">
                      <a href="http://www.middlebury.edu/giving" class="midd-footer__link" target="_blank">Giving</a>
                    </li>
                    <li class="midd-footer__item">
                      <a href="http://www.middlebury.edu/offices/business/hr/jobseeker" class="midd-footer__link" target="_blank">Employment</a>
                    </li>
                    <li class="midd-footer__item">
                      <a href="http://www.middlebury.edu/office/" class="midd-footer__link" target="_blank">Offices and Services</a>
                    </li>
                    <li class="midd-footer__item">
                      <a href="http://www.middlebury.edu/about/copyright" class="midd-footer__link" target="_blank">Copyright</a>
                    </li>
                    <li class="midd-footer__item">
                      <a href="http://www.middlebury.edu/about/privacy" class="midd-footer__link" target="_blank">Privacy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>

          <div class="drawer" id="midd-nav-drawer" aria-hidden="true">
            <div class="drawer__overlay" tabindex="-1" data-drawer-close="">
              <div class="drawer__content" role="dialog" aria-modal="true" aria-labelledby="midd-modal-1-title">
                <div class="drawer__header">
                  <h2 class="sr-only" id="midd-modal-1-title">Navigation</h2>
                  <button class="drawer__close" aria-label="Close modal" data-drawer-close="">
                    <svg class="icon mr-1" focusable="false" aria-hidden="true" width="24" height="24" fill-rule="evenodd" viewBox="0 0 24 24"><path d="M13.414 12l8.485 8.485-1.414 1.414L12 13.414 3.515 21.9 2.1 20.485 10.586 12 2.1 3.515 3.515 2.1 12 10.586 20.485 2.1 21.9 3.515 13.414 12z"/></svg>
                    Close
                  </button>
                </div>
                <div id="midd-modal-1-content">
                  <nav class="drawer-nav" aria-labelledby="midd-drawer-nav-label">
                    <h2 class="sr-only" id="midd-drawer-nav-label">Navigation</h2>
                    <ul class="drawer-nav__list drawer-nav__list--top">
                      <li class="drawer-nav__item"> <a href="http://middlebury.edu/college/admissions" class="drawer-nav__link drawer-nav__link--top is-active"  target="_blank">Admissions</a> </li>
                      <li class="drawer-nav__item"> <a href="http://www.middlebury.edu/academics" class="drawer-nav__link drawer-nav__link--top" target="_blank">Academics</a> </li>
                      <li class="drawer-nav__item"> <a href="http://www.middlebury.edu/student-life" class="drawer-nav__link drawer-nav__link--top" target="_blank">Student Life</a> </li>
                      <li class="drawer-nav__item"> <a href="https://athletics.middlebury.edu/landing/index" class="drawer-nav__link drawer-nav__link--top" target="_blank">Athletics</a> </li>
                      <li class="drawer-nav__item"> <a href="http://www.middlebury.edu/arts" class="drawer-nav__link drawer-nav__link--top" target="_blank">Arts</a> </li>
                      <li class="drawer-nav__item"> <a href="http://www.middlebury.edu/international" class="drawer-nav__link drawer-nav__link--top" target="_blank">Middlebury International</a> </li>
                    </ul>

                    <ul class="drawer-nav__list drawer-nav__list--util">
                      <li class="drawer-nav__item"> <a href="http://www.middlebury.edu/newsroom" class="drawer-nav__link drawer-nav__link--util" target="_blank">Newsroom</a> </li>
                      <li class="drawer-nav__item"> <a href="http://www.middlebury.edu/events" class="drawer-nav__link drawer-nav__link--util" target="_blank">Calendar of Events</a> </li>
                      <li class="drawer-nav__item"> <a href="https://www.middlebury.edu/office/" class="drawer-nav__link drawer-nav__link--util" target="_blank">Offices and Services</a> </li>
                      <li class="drawer-nav__item"> <a href="http://www.middlebury.edu/giving" class="drawer-nav__link drawer-nav__link--util" target="_blank">Giving</a> </li>
                    </ul>

                  </nav>
                </div>
              </div>
            </div>
          </div>

          <script src="/midd.js"></script>



      </body>
    </html>
  </xsl:template>
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
