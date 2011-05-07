# Makefile for Publisher

build : publisher.js publisher_min.js

publisher_min.js : publisher.js
			java -jar ~/projects/closure-compiler/build/compiler.jar --js=publisher.js --js_output_file=publisher_min.js --compilation_level=SIMPLE_OPTIMIZATIONS

publisher.js : $(coffeescripts)
					coffee -c publisher.coffee

publisher.coffee :
