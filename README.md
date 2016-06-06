### DNI Pushdown HTML5 template

We have supplied a basic example using our pushdown SDK which can be used as the basis of a new project. The ad can be fully customized with video, css/svg animations or any other HTML elements. You must ensure that the script main.min.js is always included in index.html so the ad functions as intended.

Within our sample index.html file we have a #Pushdown_Stage div which should wrap all other HTML elements. Within the #Pushdown_Stage element there are two child div elements, this is where you should place your content. All  open state content should be placed inside the #Pushdown_Opened  div. While all closed state content should be placed inside #Pushdown_Closed.

## Interaction event triggers

The pushdown SDK when initialized sets event listeners for two convenience class names so you can easily set elements to open the landing page or toggle the ad state (open/closed).

When initialized the pushdown SDK sets up event listeners on the following class names to simplify opening the landing page and toggling the open/close ad state.

> .ad-click

Any elements with the class .ad-click will open the landing page. No further code is required. You will see in our example that the .ad-click class has been applied to the #Pushdown_Closed and #Pushdown_Opened elements, this should be sufficient in most cases.
> .ad-toggle

Any elements with the class .ad-toggle will control the ads open/close status. Again, no further code is required this is handled via the pushdown API. When the ad is in a closed state the pushdown API will also apply the .ad-closed class to any element with the .ad-toggle class. Conversely the .ad-opened class is applied to .ad-toggle elements when ad is open. This allows for customization of the open/close button/link appearance. In our example we use a simple anchor tag and set the text for each status in styles.css.

The SDK automatically handles pausing and resetting any media elements when the ad closes.

## Pushdown configuration and initialization

As shown in our sample ad you must instantiate and initialize the pushdown SDK. Below you can see the various configuration options that can be set.

```
#!JavaScript
//instantiate a new pushdown with your chosen configuration parameters
var pushdown = AdOps.pushdown({
    openContainer: '#Pushdown_Opened',  //Set element with opened state content, recommended not to change this
    closeContainer: '#Pushdown_Closed', //Set element with closed state content, recommended not to change this
    delay: 15000                        //Set delay in milliseconds or false to disable auto-close
});

//initialize the pushdown
pushdown.init();

```  

## Trafficking markup                 

```
#!html   
<!--nosandbox-->
<script src="http://your-cdn.com/html5-pushdown/enabler.min.js"></script>
<script>
    var pushdown = AdOps.pushdown({
        src: 'http://your-cdn.com/html5-pushdown/index.html',
        clickUrl: '#{click("defaultClick")}'
    });

    pushdown.init();
</script>
```
