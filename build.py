from scripts.helper_funcs import running_build, css_build, clean_public, compile_static

# Emptying public/ directory
print('Clearing space for landing...')
clean_public()

# Compile static assets
print('Compiling static assets...')
compile_static()



# Build index.html


# Build running.html
print('Building running page...')
div_id = running_build()

# Build wiki.html


# Build contact.html


# Build style.css
css_build(div_id)
