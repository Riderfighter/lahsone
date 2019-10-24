export default class Theme
{
    /**
     *
     */
    public static ScheduleHighlight: string = "#EDEDED";
    private static useLight = true;
    /**
     * Default, Light: #F3F3F3
     * Default, Dark: #2E3047
     */
    public static Background: string = Theme.useLight ? "#F3F3F3" : "#2E3047";
    /**
     * Default, Light: #434343
     * Default, Dark: #82A1B0
     */
    public static Logo: string = Theme.useLight ? "#434343" : "#82A1B0";
    /**
     * Default, Light: #1F1F1F
     * Default, Dark: #B8C7DB
     */
    public static LogoSuperscript: string = Theme.useLight ? "#1F1F1F" : "#B8C7DB";
    /**
     * Default, Light: #111111
     * Default, Dark: #CAE2E3
     */
    public static Title: string = Theme.useLight ? "#111111" : "#CAE2E3";
    /**
     * Default, Light: #222222
     * Default, Dark: #A1B2B3
     */
    public static Subtitle: string = Theme.useLight ? "#222222" : "#A1B2B3";
    /**
     * Default, Light: #424242
     * Default, Dark: #A2B0B8
     */
    public static Content: string = Theme.useLight ? "#424242" : "#A2B0B8";
    /**
     * Default, Light: #9CC884
     * Default, Dark: #5C7A67
     */
    public static SchedulePie: string = Theme.useLight ? "#9CC884" : "#5C7A67";

}
