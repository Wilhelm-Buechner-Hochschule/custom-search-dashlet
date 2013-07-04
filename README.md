Site Custom Search Dashlet for Alfresco Share
=============================================

This add-on project for Alfresco Share defines a simple dashlet which allows
to set a search query template which can be used by all other users of the
Site. The magic value "$q" is replaced by the search term the user enters.

For example, setting "$q AND TAG:cc" will set a template, and if the user
enters "Foo" as search term, the actual query "Foo AND TAG:cc" will be
executed.

Installation
------------

The dashlet has been developed to install on top of an existing Alfresco
4.0 installation.

An Ant build script is provided to build a JAR file containing the 
custom files, which can then be installed into the 'tomcat/shared/lib' folder 
of your Alfresco installation.

To build the JAR file, run the following command from the base project 
directory.

    ant clean dist-jar

The command should build a JAR file named site-blog-dashlet.jar
in the 'dist' directory within your project.

To deploy the dashlet files into a local Tomcat instance for testing, you can 
use the hotcopy-tomcat-jar task. You will need to set the tomcat.home
property in Ant.

    ant -Dtomcat.home=C:/Alfresco/tomcat clean hotcopy-tomcat-jar
    
Once you have run this you will need to restart Tomcat so that the classpath 
resources in the JAR file are picked up.

Using the dashlet
-----------------

Log in to Alfresco Share and navigate to a site dashboard. Click the 
Customize Dashboard button to edit the contents of the dashboard and drag 
the dashlet into one of the columns from the list of dashlets.
