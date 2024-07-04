export function getLoginPage(errorMessage){
    const errorToRender = errorMessage ? `<p class="login-error">${errorMessage}</p>` : "";

    return (`
    <form>
        <div class="login-container">
            <div class="login-header">
                <h1 class="login-header-apptitle">School Diary App</h1>
                <p class="login-header-creator">by Kacper Zalewski</p>
            </div>
            <div class="login-input-container">
                <label class="login-input-label">Login</label>
                <input id="username" class="login-input-textfield" type="text" name="username" required/>
                <label class="login-input-label">Password</label>
                <input id="password" class="login-input-textfield" type="password" name="password" required/>
            </div>
            ${errorToRender}
            <button type="button" id="submitButton" class="login-submit">LOGIN</button>
        </div>
    </form>`)
}