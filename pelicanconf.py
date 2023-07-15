# Theme-specific settings
SITENAME = 'Tyler Hext'
DOMAIN = 'tylerhext.com'
BIO_TEXT = 'Data professional from Los Angeles, CA'
FOOTER_TEXT = 'Powered by <a href="http://getpelican.com">Pelican</a> and <a href="http://pages.github.com">GitHub&nbsp;Pages</a>.'

SITE_AUTHOR = 'Tyler Hext'
# TWITTER_USERNAME = '@iKevinY'
# GOOGLE_PLUS_URL = 'https://plus.google.com/+KevinYapCA'
# MASTODON_URL = "https://mastodon.social/@iKevinY"
INDEX_DESCRIPTION = 'Website and blog of Tyler Hext, a data professional from Los Angeles, CA.'

SIDEBAR_LINKS = [
    '<a href="/about/">About</a>',
    '<a href="/archive/">Archive</a>',
]

ICONS_PATH = 'images/icons'

SOCIAL_ICONS = [
    #('https://twitter.com/iKevinY', 'Twitter', 'fa-twitter'),
    ('https://github.com/TylerHext', 'GitHub', 'fa-github'),
    ('https://www.linkedin.com/in/tyler-hext-68673a196/', 'LinkedIn', 'fa-linkedin'),
    #('https://instagram.com/ikeviny', 'Instagram', 'fa-instagram'),
    #('https://buttondown.email/iKevinY', 'Newsletter', 'fa-newspaper-o'),
    #('/atom.xml', 'Atom Feed', 'fa-feed'),
]

THEME_COLOR = '#FF8000'

# BUTTONDOWN_LINK = 'https://buttondown.email/iKevinY'

# Pelican settings
RELATIVE_URLS = True
SITEURL = 'https://tylerhext.com'
TIMEZONE = 'America/Los_Angeles'
DEFAULT_DATE = 'fs'
DEFAULT_DATE_FORMAT = '%B %-d, %Y'
DEFAULT_PAGINATION = False
SUMMARY_MAX_LENGTH = 42

THEME = 'themes/pneumatic'

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}/'
ARTICLE_SAVE_AS = ARTICLE_URL + 'index.html'

PAGE_URL = '{slug}/'
PAGE_SAVE_AS = PAGE_URL + 'index.html'

ARCHIVES_SAVE_AS = 'archive/index.html'
YEAR_ARCHIVE_SAVE_AS = '{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%Y}/{date:%m}/index.html'

# Disable authors, categories, tags, and category pages
DIRECT_TEMPLATES = ['index', 'archives']
CATEGORY_SAVE_AS = ''

# Disable Atom feed generation
FEED_ATOM = 'atom.xml'
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

TYPOGRIFY = True

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.admonition': {},
        'markdown.extensions.codehilite': {'linenums': None},
        'markdown.extensions.extra': {},
    },
    'output_format': 'html5',
}

CACHE_CONTENT = False
DELETE_OUTPUT_DIRECTORY = True
OUTPUT_PATH = 'output'
PATH = 'content'

templates = ['404.html']
TEMPLATE_PAGES = {page: page for page in templates}

STATIC_PATHS = ['images', 'files', 'extra']
IGNORE_FILES = ['.DS_Store', 'pneumatic.scss', 'pygments.css']

extras = ['CNAME', 'favicon.ico', 'keybase.txt', 'robots.txt']
EXTRA_PATH_METADATA = {'extra/%s' % file: {'path': file} for file in extras}

PLUGIN_PATHS = ['plugins']
PLUGINS = ['assets', 'neighbors']
ASSET_SOURCE_PATHS = ['static']
ASSET_CONFIG = [
    ('cache', False),
    ('manifest', False),
    ('url_expire', False),
    ('versions', False),
]
