/**
 * Main entry point for the webscript
 */
function main()
{
   // Is user privileged to change the configuration
   var isPrivileged = true;
   if (!user.isAdmin)
   {
      if (page.url.templateArgs.site)
      {
         isPrivileged = false;
         // We are in the context of a site, so call the repository to see if the user is site manager or not
         var json = remote.call("/api/sites/" + page.url.templateArgs.site + "/memberships/" + encodeURIComponent(user.name));

         if (json.status == 200)
         {
            var obj = eval('(' + json + ')');
            if (obj)
            {
               isPrivileged = (obj.role == "SiteManager");
            }
         }
      }
   }
   model.isPrivileged = isPrivileged;

   // Prepare the model for the search
   model.searchTerm = args.searchTerm || "";
   model.limit = args.limit || 10;
   model.title = args.title || msg.get("header.title");

   // Widget instantiation metadata...
   var siteCustomSearch = {
      id: "SiteCustomSearch",
      name: "Alfresco.dashlet.SiteCustomSearch",
      assignTo: "siteCustomSearch",
      options: {
         siteId: (page.url.templateArgs.site != null) ? page.url.templateArgs.site : "",
         componentId: instance.object.id,
         searchRootNode: (config.scoped['RepositoryLibrary']['root-node']).value,
         searchTerm: "",
         searchTermTemplate: model.searchTerm,
         limit : model.limit,
         title: model.title
      }
   };

   var dashletResizer = {
      id : "DashletResizer",
      name : "Alfresco.widget.DashletResizer",
      initArgs : ["\"" + args.htmlid + "\"", "\"" + instance.object.id + "\""],
      useMessages: false
   };
   
   var actions = [];
   if (model.isPrivileged) {
      actions.push({
         cssClass: "edit",
         eventOnClick: {
            _alfValue : "siteCustomSearchDashletEvent" + args.htmlid.replace(/-/g, "_"),
            _alfType: "REFERENCE"
         },
         tooltip: msg.get("dashlet.edit.tooltip")
      });
   }
   actions.push({
      cssClass: "help",
      bubbleOnClick:
      {
         message: msg.get("dashlet.help")
      },
      tooltip:  msg.get("dashlet.help.tooltip")
   });

   var dashletTitleBarActions = {
      id : "DashletTitleBarActions",
      name : "Alfresco.widget.DashletTitleBarActions",
      useMessages : false,
      options : {
         actions: actions
      }
   };

   model.widgets = [siteCustomSearch, dashletResizer, dashletTitleBarActions];
}

main();