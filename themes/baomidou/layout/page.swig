<div id="content-wrap">
  <div id="content" class="wrapper">
    <div id="content-inner">
      <article class="article-container" itemscope itemtype="http://schema.org/Article">
        <div class="article-inner">
          <div class="article">
            <div class="inner">
              {% if page.title %}
              <header class="article-header">
                <h1 class="article-title" itemprop="name">{{ page.title }}</h1>
                <a href="{{ raw_link(page.source) }}" class="article-edit-link" title="{{ __('page.improve') }}"><i class="fa fa-pencil"></i></a>
              </header>
              {% endif %}
              <div class="article-content" itemprop="articleBody">
                {{ page_anchor(page.content) }}
              </div>
              {% if page.title %}
              <footer class="article-footer">
                <time class="article-footer-updated" datetime="{{ date_xml(page.updated) }}" itemprop="dateModified">{{ __('page.last_updated', date(page.updated)) }}</time>
                {{ page_nav() }}
              </footer>
              {{ partial('partial/comment') }}
              {% endif %}
            </div>
          </div>
          {% if page.title %}
          <aside id="article-toc" role="navigation">
            <div id="article-toc-inner">
              <strong class="sidebar-title">{{ __('page.contents') }}</strong>
              {{ toc(page.content, {list_number: false}) }}
              <a href="#" id="article-toc-top">{{ __('page.back_to_top') }}</a>
            </div>
          </aside>
          {% endif %}
        </div>
      </article>
      {% if page.title %}
      {{ partial('partial/sidebar') }}
      {% endif %}
    </div>
  </div>
</div>
