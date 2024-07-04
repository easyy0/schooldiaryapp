export const views = {
    getPageDefaults() {
        return (`
        <div class="home-center">
            <div class="select-container">
                <select class="select-box">
                    <option value="0">Select class:</option>
                    <option value="1">1A</option>
                    <option value="2">1B</option>
                    <option value="3">1C</option>
                    <option value="4">1D</option>
                </select>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="page">
                <button class="page-arrow fa-solid fa-chevron-left"></button>
                <span class="page-text">10.06.2024 - 16.06.2024</span>
                <button class="page-arrow fa-solid fa-chevron-right"></button>
            </div>
        </div>
        `)
    },
    getTimetable() {
        return (`
        <table class="tg">
            <thead>
                <tr>
                <th class="tg-0lax">Nr</th>
                <th class="tg-0lax">Hours</th>
                <th class="tg-0lax">Monday</th>
                <th class="tg-0lax">Tuesday</th>
                <th class="tg-0lax">Wednesday</th>
                <th class="tg-0lax">Thursday</th>
                <th class="tg-0lax">Friday</th>
                <th class="tg-0lax">Saturday</th>
                <th class="tg-0lax">Sunday</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="tg-0lax">0</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">1</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">2</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">3</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">4</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">5</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">6</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">7</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">8</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">9</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
                <tr>
                    <td class="tg-0lax">10</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax"></td>
                </tr>
            </tbody>
        </table>
        `)
    }
}