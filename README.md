# lahsone

**Structure**

@lahsone/common
- Utility common between all versions of the project

@lahsone/web
- Web version of the project, handles React rendering and integrates with /common

@lahsone/app
- Native version of the project, handles React Native rendering and integrates with /common


**Setup**

This project comes with its own CLI, which automates some task. Follow these steps to start using it.

> git clone {repo}

> cd lahsone

> chmod 700 lahsone

> ./lahsone init # Initialize dependencies

> ./lahsone run web # Start the project on the web.

Note: If you're system doesn't support bash scripts, you're screwed. Good luck, soldier.


**Running**

For any target platform, you'll need to ``cd`` to the root lahsone/

@lahsone/web
> ./lahsone run web

@lahsone/app
> ./lahsone run [ios|android]
