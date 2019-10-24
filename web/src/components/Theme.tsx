/**
 * CHANGE THE DIRECTORY HERE TO CHANGE THEMES
 */
import theme from '../common/themes/default-dark.json'

export default class Theme
{
    /**
     * Default, Light: #F3F3F3
     * Default, Dark: #2E3047
     */
    public static Background: string = theme.Background;

    /**
     * Default, Light: #434343
     * Default, Dark: #82A1B0
     */
    public static Logo: string = theme.Logo;

    /**
     * Default, Light: #1F1F1F
     * Default, Dark: #B8C7DB
     */
    public static LogoSuperscript: string = theme.LogoSuperscript;

    /**
     * Default, Light: #111111
     * Default, Dark: #CAE2E3
     */
    public static Title: string = theme.Title;

    /**
     * Default, Light: #222222
     * Default, Dark: #A1B2B3
     */
    public static Subtitle: string = theme.Subtitle;

    /**
     * Default, Light: #424242
     * Default, Dark: #A2B0B8
     */
    public static Content: string = theme.Content
    ;

    /**
     * Default, Light: #9CC884
     * Default, Dark: #5C7A67
     */
    public static SchedulePie: string = theme.SchedulePie;

    /**
     * 
     */
    public static ScheduleHighlight: string = theme.ScheduleHighlight;
    
}