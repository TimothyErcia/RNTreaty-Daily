# Treaty-DailyTask

I program everyday until i finish the project

## What to build

### Problem

When tracking money spending on certain categories user needs to input amount and description manually via notes and after collectively inserting all the amount and description at the end of the week user summarizes all the spending in a google sheet document wherein it computes the total spent plus the predicitve saving for the current month.

### Solution

Build a mobile application that supports Android and iOS which collects all the inputs of the amount and description/category of the user and automatically summarize all the spending and savings predicition for the current month.

## Where to build

### Platforms

-   **Android** (Android Studio)<sup>Kotlin</sup>
-   **iOS** (XCode)<sup>Swift</sup>
-   **Web** _future projects most likely a cross-platform build_

### API Service & Database

-   MongoDB Realm
-   Google Sheets API (_Needs more R&D_)

## System Architecture _HIGH LEVEL DESIGN_

-   Can do CRUD operation on category **price**, **description**
-   Separated by Category UID
-   Debounce offline save _background thread_
-   Sync Save operation _background service task_
-   Sync Retrieve operation _can be triggered manually or via app launch_
-   Local Push Notification on not completed task **time based operation**

## Planning & System Design

1. Story planning
    1. Features
        - Create Task
        - Retrieve Task
        - Update Task
        - Delete Task
        - Complete Task
        - Debounce save operation _cache strategy_
        - Local Push Notification _time base reminder_
        - Sync Save _Service API_
        - Sync Retrieve _Service API_
    2. Edge cases (Error handling)
        - _INSERT DIAGRAM_
2. Development Architecture (Code) Base design
    1. Koin Dependency
    2. Realm Dependency
    3. Local Notification Dependency
    4. Testing Library Dependency
3. Layout & Design

App Eraser (HIGH LEVEL DESIGN) https://app.eraser.io/workspace/1kydQuEFbIxhYKqdvoqB

Figma Design (LAYOUT)
https://www.figma.com/design/OFVeJ0ssLEdo2cbSf9ZGk3/Treaty-Daily-Design

4. CI/CD Deployment Status
