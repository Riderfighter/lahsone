# lahsone

**Structure**

@lahsone/common
- Utility common between all versions of the project

@lahsone/web
- Web version of the project, handles React rendering and integrates with /common

@lahsone/app
- Native version of the project, handles React Native rendering and integrates with /common


**Setup**

React doesn't support sources outside of /src/*, so you'll need to make a symbolic link.
> git clone {repo}

> sudo ln -s path/to/lahsone/common path/to/lahsone/web/src

> sudo ln -s path/to/lahsone/common path/to/lahsone/app/src

On Mac this should show up as an aliased folder titled "common" directly under the "src" folders.


**Running**

@lahsone/web
> yarn start

@lahsone/app
> echo "not yet implemented"
