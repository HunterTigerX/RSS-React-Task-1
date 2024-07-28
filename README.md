# Information

You can look for pokemons by color, for example you can use black, blue, brown, gray, green, pink, purple, red, white, yellow colors or id from 1 to 10.  
Sometimes pokemon description may contain gibberish text or text in different languages, that's because of pokemon api results structure and filtering them now is not necessary.

# Basic Scope

1.1 RTK query is used for api calls  
1.2 RTK query is used, you can check the code at src\reducers\root\pokemonApi.tsx

2.1 Selected items are managed through the redux store, selected items are persistent across pages  
2.2 You can select checkboxes, change pagination or search for another result, all selected checkboxes won't change until unchecked or unselected and flyout menu will contain all selected pokemons.

3.1 Flyout component is showed/hidden based on the presence of selected items, displays the number of selected items  
3.2 If you selected 0 pokemons, flyout menu will be hidden, but if at least one pokemon was selected, flyout menu will appear. Flyout menu displays the number of selected pokemons.

4.1 "Unselect all" button and "Download" button work according to the requirements  
4.2 Unselect all removes all checkboxes from pokemons and removes flyout menu, also emptying cart. If you click download, when at least one checkbox was selected, the CSV file will be downloaded, containing pokemon number, pokemon id, description and url to pokemon json data.

5.1 User can switch the theme of the application  
5.2 There is a light theme and a dark theme in the application. Context API was used to control themes. You can switch theme by clicking the appropriate button.

# Forfeits

1.1 TypeScript isn't used  
1.2 TypeScript is used in the project

2.1 Test coverage below 80%  
2.2 Test coverage of stmts is 81.28%

3.1 Usage of any  
3.2 No any was used

4.1 Usage of ts-ignore  
4.2 ts-ignore was not used

5.1 Direct DOM manipulations inside the React components: -50 points per each  
5.2 There are no DOM manipulations insode the react components

6.1 Presence of code-smells (God-object, chunks of duplicate code), commented code sections  
6.2 I hope there are nothing like that in that project and I did not miss anything.

7.1 Usage of component libraries, e.g. Material UI, Ant Design: -100 points  
7.2 No libraries were used

8.1 Commits after the deadline  
8.2 Last commit was 28.07.2024

9.1 Pull Request doesn't follow guideline (including checkboxes in Score) PR example: -10 points  
9.2 Pull Request follows guidline from https://docs.rs.school/#/en/pull-request-review-process?id=pull-request-description-must-contain-the-following
