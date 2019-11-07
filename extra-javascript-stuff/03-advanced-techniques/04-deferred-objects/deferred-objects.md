# **Advanced Techniques in JavaScript and jQuery**

## **Deferred Objects**

- jQuery provides an alternate to callbacks for asynchronous processing: Deferred.

- Deferred allow for:

    - Grouping multiple asynchronous processes.

    - Attaching multiple success and failure handlers.

    - Postpone logic flow until all asynchronous processes complete - in any order

    - Integration of AJAX and custom functions into asynchronous processing.

Making an AJAX call with jQuery:

    - Implements the JavaScript promise.

    - AJAX calls:

        - Open a connecton to an external resource.

        - Begin transfer of the resource.

        - Upon completion, execute success or failure callbacks.

        - Resolve or reject a promise.

    - Many developers just pass success or failure callback functions.

    - The returned promise is mostly ignored.

Traditional AJAX Processing Sample:

        $.get('SomeFile.html', function(result) {
            // This is the callback function
            // Process the result - and set some
            // flag to indicate completion.
        });

    - Few developers capture the result of the $.getfunction call.

    - The callback is used to trigger further processing upon completion.

    - Gets problematic if multiple processes need to execute.

Loading Dynamic Content

- Requirements

    - Load content into three <DIV> elements asynchronously.

    - When all content is loaded, enable another element.

    - Only load content when user clicks the "Load" button.

- Using jQuery "load" method appears to work

    - Content loads.

    - "Proceed" button is enabled with a callback function.

- Load other content pages

    - using "load" should work for multiple contents.

    - We must decide which load method uses the callback.

    - Asynchronous methods can't be counted on to finish in a specific order.

- Problems with current "load" logic

    - Only one call back for three loads.

    - Must guess which content will take the longest to load.

- Common pattern that is often used

    - Settled on because it works.

- Problems with this approach ("christmas tree effect")

    - Not truly an asynchronous process.

    - Not scalable.

    - Hard to maintain.

- jQuery Deferred Method

    - Use "get" method instead of "load".

    - "get" uses Deferred, "load" does not.

    - When / Then pattern

        - Can include as many gets as desired.

        - Then processing only occurs once all When methods complete.

        - Extensible, but readability coould be improved.

- Create a function to load content

    - Load specified URL into specified element.

    - Return the results of a "get" method.

    - Needs two parameters - for now.

- Negative testing

    - Check bad URL

    - Check bad section element

    - Alternate syntax for WHEN / THEN

Some methods available on deferred objects

    - Return deferred object for a process flow

        - when

        - promise

    - Attach handler functions to deferred object

        - then

        - done

        - fail

        - progress

        - always

    - Change state of deferred object

        - Resolve

        - Reject

Dynamic pages vs static pages

    - Scripts execute on loaded page

    - Loaded page also loads embedded elements

    - Loaded page may wait for user interaction

Creating A Deferred Object

- A self-managed deferred object is userful when:

    - Writing long-running processes

    - Loading content that contains embedded content

    - Wrapping a process flow into a single process