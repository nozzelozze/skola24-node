import getActiveYears from "./api/endpoints/getActiveYears";
import getRenderKey from "./api/endpoints/getRenderKey";
import getTimetable from "./api/endpoints/getTimetable";
import getUnitSelections, { Filters, Selections } from "./api/endpoints/getUnitSelections";
import type { Unit } from "./api/endpoints/getUnits";
import getUnits from "./api/endpoints/getUnits";
import type SelectionType from "./api/endpoints/selectionTypes";
import type { Dimensions, Timetable } from "./api/helperTypes";
import type Host from "./api/utils/hosts";
import transformTimetable from "./api/transformTimetable";


class Skola24
{
    private currentHost: Host
    private currentSchoolGuid: string
    private schoolYear: string | null

    /**
     * Skapar en ny instans av Session-klassen och initierar nödvändiga parametrar.
     * 
     * ### Tänk på att
     * * Om en metod i klassen är async använd nyckelordet `await`
     * * GUID står för *Globally Unique Identifier* och är som som ett unikt id som ingen annan har.
     * * En `Unit` är som en skola
     * * En `Host` är som ksgyf ex `ksgyf.skola24.se`
     * * En `Selection` är antingen en klass, person eller rum osv. Alltså någoting som har ett schema.
     * 
     * @param host - Domänen för skolan, exempelvis `ksgyf.skola24.se`. Se alla olika domäner i `src/api/hosts.ts`
     * @param schoolGuid - (Valfritt) Förvalt skol-GUID för sessionen.
     * 
     * @example
     * ```
     * // Skapar en ny session kopplad till en specifik host
     * const session = new Session('skola24host.com')
     * 
     * // Skapar en ny session kopplad till en specifik host och skola
     * const sessionWithSchool = new Session('skola24host.com', 'someSchoolGuid')
     * ```
     */
    public constructor(host: Host,  schoolGuid?: string)
    {
        this.currentHost = host
        this.currentSchoolGuid = schoolGuid || null
        //this.initialize()
    }

    private async getSchoolYear()
    {
        let result = await getActiveYears(this.currentHost)
        this.schoolYear = result.data[0].guid
    }

    /**
     * Gör ett API-anrop till Skola24 för att hämta skolor kopplade till `this.currentHost`
     * 
     * @returns En Promise som antingen innehåller en array av objekt med skolornas namn och GUID, eller `null` om anropet misslyckades
     * 
     * @example
     * ```
     * let schools = await session.getSchools();
     * if (schools) // Kollar så att anropet lyckades
     * {
     *     console.log(schools[0].name) // Outputtar t.ex. 'Lars Kagg'
     * } n
     * ```
     */
    public async getSchools(): Promise<{ name: string, guid: string }[] | null>
    {
        let result = await getUnits(this.currentHost)
        if (!this.checkResult(result)) return

        return result.data.map((unit) => { return { guid: unit.unitGuid, name: unit.unitId } })
    }

    /**
     * Sätter sessionens aktuella skola genom att uppdatera `this.currentSchoolGuid`. Detta gör att schoolGuid inte behöver specifieras i andra metoder.
     * 
     * @param schoolGuid - GUID för den skola som ska bli den aktuella skolan för sessionen
     * 
     * @returns Inget, funktionen är en void-funktion
     * 
     * @example
     * ```
     * const schoolGuid = ... // Få skolans guid genom att exempelvis använda getSchools
     * session.setSchool(schoolGuid) // Du kan nu använda metoder som getSchedule
     * ```
     */
    public setSchool(schoolGuid: string)
    {
        this.currentSchoolGuid = schoolGuid
    }

    /**
     * Kollar om Session objekted har en skola
     * 
     * @returns En boolean som talar om om `this.currentSchoolGuid` är satt.
     * 
     */
    public hasSchool()
    {
        return this.currentSchoolGuid ? true : false
    }
    
    /**
     * Utför ett API-anrop för att hämta tillgängliga urval baserade på en uppsättning filter.
     * 
     * @param filters: Filters - Ett Filters-objekt som innehåller kriterier för urvalsfiltrering.
     * @param schoolGuid?: string - (Valfritt) GUID för skolan. Om ingen anges används `this.currentSchoolGuid`.
     * 
     * @returns Ett Promise som antingen innehåller ett objekt med framgångsstatus och urvalsdata, eller ett objekt där framgångsstatus är `false`.
     * 
     * @example
     * ```
     * const filters = { class: true } // Genom att bara sätta class till true så kommer vi bara få tillbaks klasser
     * const result = await session.getSelections(filters)
     * if (result.success) // Kolla så att API-anropet och allt annat lyckades
     * {
     *     console.log(result.data.classes[0].groupName) // Ouputtar t.ex 'TE22B'
     * } else
     * {
     *     displaySnackbar("Data lyckades inte hämtas. Försök igen senare") // T.ex
     * }
     * ```
     */
    public async getSelections(filters: Filters, schoolGuid?: string): Promise<{ success: boolean, data: Selections }>
    {
        if (!schoolGuid && !this.currentSchoolGuid)
            return { success: false, data: null }

        let result = await getUnitSelections(this.currentHost, schoolGuid ?? this.currentSchoolGuid, filters)
        if (!this.checkResult(result))
            return { success: false, data: null }

        return { success: true, data: result.data }
    }

    /**
     * Utför ett API-anrop för att hämta ett schemat baserat på en given urvalssträng och veckonummer.
     * 
     * @param selection: string - Urvalssträng som specificerar vilket schema som ska hämtas. Få detta genom `getSelections` metoden.
     * @param week: number - Veckonumret för det schema du önskar hämta.
     * @param schoolGuid?: string - (Valfritt) GUID för skolan. Om ingen anges används `this.currentSchoolGuid`.
     * 
     * @returns Ett Promise som antingen innehåller ett objekt med framgångsstatus och schemadata, eller ett objekt där framgångsstatus är `false`.
     * 
     * ### Schemadata typen `Timetable` innhåller
     * 
     * #### Data för linjer, boxar och text som man enkelt med givna koordinater och färger kan rendera
     * * `lineList` - Array med data för alla olika lines
     * * `boxList` - Array med data för olika boxar
     * * `textList` - Array med data för all text
     * 
     * #### `lessonInfo` objekt som inhåller icke renderad data utan självaste informationen. Ex:
     * ```
     * {
     *      guidId: 'OTA2YTU0MzYtMmY5OC1mMTljLTkxM2MtYzhjMTg0NmViNjk1',
     *      texts: [ 'Programmering 1', 'BH', 'F201' ],
     *      timeStart: '08:10:00',
     *      timeEnd: '09:40:00',
     *      dayOfWeekNumber: 4,
     *      blockName: ''
     * }
     * ```
     * 
     * @example
     * ```
     * const selection = ... // Få selection strängen genom att använda getSelections
     * const result = await session.getSchedule(selection, 42)
     * if (result.success)
     * {
     *     console.log(result.data); // Outputtar schemadata
     * }
     * ```
     */
    public async getSchedule(selection: string, week: number, dimensions: Dimensions, selectionType: SelectionType, schoolGuid?: string): Promise<{ success: boolean, data: Timetable }>
    {
        if (!this.schoolYear)
            await this.getSchoolYear()
        const failed = { success: false, data: null }

        if (!this.currentSchoolGuid && !schoolGuid) return failed

        const renderKeyResult = await getRenderKey()
        if (!this.checkResult(renderKeyResult))
            return failed

        const renderKey = renderKeyResult.data

        let result = await getTimetable(this.currentHost, renderKey, this.schoolYear, schoolGuid ?? this.currentSchoolGuid, selection, week, dimensions, selectionType)
        if (!this.checkResult(result)) return failed

        console.log(result)
        const timetable = transformTimetable(result.data)

        return { success: true, data: timetable }
    }


    // Helper functions
    private checkResult = (result: { success: boolean, data: any }) =>
    {
        if (!result.success || !result.data)
            return false
        return true
    }

}

export default Skola24