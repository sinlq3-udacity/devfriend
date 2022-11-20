async function load(folder,callback,loaded) {     
    callback=callback||cardAction;   
    var payload = await fetch(`./${folder}/payload.json`).then(x => x.json());

    var context = {
        $root: await fetch(`./${folder}/data.json`).then(x => x.json())
    };

    // Create a Template instance from the template payload
    var template = new ACData.Template(payload);
    var card = template.expand(context);
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();
    // Set its hostConfig property unless you want to use the default Host Config
    // Host Config defines the style and behavior of a card
    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
        fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
        // More host config options
    });
    // Set the adaptive card's event handlers. onExecuteAction is invoked
    // whenever an action is clicked in the card
    adaptiveCard.onExecuteAction = callback;
    // Parse the card payload
    adaptiveCard.parse(card);
    // Render the card to an HTML element:
    var renderedCard = adaptiveCard.render();
    // And finally insert it somewhere in your page:
    document.body.prepend(renderedCard); 
    if(loaded)loaded();
};  

async function cardAction(action){
    console.log(action);
}