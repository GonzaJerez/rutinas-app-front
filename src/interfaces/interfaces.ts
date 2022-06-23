
/**
 * TIPADO MODOS DE ENTRENAMIENTO
 */
export const modeTraining = ['Simultaneo', 'Intercalado', 'Una a la vez', 'Manteniendo el opuesto'] as const
type ModeType = typeof modeTraining[number]

/**
 * USERS & AUTHENTICATION
 */
export interface UserResponse {
    user:  User;
    token: string;
    msg?:   string;
}

export interface User {
    movements: any[];
    name:      string;
    email:     string;
    status:    boolean;
    google:    boolean;
    role:      string;
    _id:       string;
    img?:      string;
    msg?:      string;
}

export interface UpdateProfile {
    name:      string;
    img:       string;
}

export interface UpdateEmail {
    email1: string;
    email2: string;
}

export interface UpdatePassword {
    actualPassword: string;
    newPassword:    string;
}

export interface LoginData {
    email: string,
    password: string,
}

export interface RegisterData extends LoginData {
    name: string
}

export interface RecoverPasswordResponse {
    ok:     boolean;
    msg:    string;
}



/**
 * MUSCLES & WORKOUTS
 */
export interface GetWorkouts {
    workouts: Workout[];
    pathImg:  string;
}

export interface Workout {
    _id:        string;
    name:       string;
    muscle:     Muscle;
    status:     boolean;
    img:        string;
    validTools: string[]
    __v:        number;
}

export interface GetMuscles {
    muscles: Muscle[];
    pathImg: string;
}

export interface Muscle {
    _id:    string;
    name:   string;
    status: boolean;
    img:    string;
    __v:    number;
}



/**
 * ROUTINES
 */
export interface GetRoutines {
    page:           number;
    limit:          number;
    total:          number;
    routines:       Routine[];
    msg?:           string;
}

export interface RoutineResponse {
    routine:        Routine;
    msg?:           string;
}

export interface Routine {
    name:              string;
    typeUnit:          'kg' | 'lb';
    creatorUser:       User;
    actualUser:        User;
    img:               string;
    timer:             number;
    days:              Day[];
    creationDate:      number;
    modifyDate:        number;
    isPendingToAccept: boolean;
    _id:               string;
    __v:               number;
}

export interface RoutineToCopy {
    name:               string;
    typeUnit:          'kg' | 'lb';
    creatorUser?:       User;
    actualUser?:        User;
    img:                string;
    days:               DayIdOptional[];
    creationDate?:      number;
    modifyDate?:        number;
    isPendingToAccept?: boolean;
    _id?:               string;
    __v?:               number;
}

export interface Day {
    workouts?:  CombinedWorkout[];
    _id:        string;
}

export interface DayIdOptional {
    workouts?: WorkoutInRoutineIdOptional[];
    _id?:      string;
}

export interface CombinedWorkout {
    combinedWorkouts:  WorkoutInRoutine[];
    _id?:              string;
}

/* export interface CombinedWorkoutIdOptional {
    combinedWorkouts: WorkoutInRoutine[];
    _id?:             string;
} */

export interface WorkoutInRoutine {
    workout:  Workout;
    tool:     string;
    sets:     Set[];
    // mode:     'Simultaneo' | 'Intercalado' | 'Una a la vez' | 'Manteniendo el opuesto';
    mode:     ModeType;
    _id:      string;
}

export interface WorkoutInRoutineIdOptional {
    workout:  Workout | string;
    tool:     string;
    sets:     SetIdOptional[];
    mode:     'Simultaneo' | 'Intercalado' | 'Una a la vez' | 'Manteniendo el opuesto';
    _id?:     string;
}

export interface Set {
    numReps:        string;
    weight:         string;
    isDescending:   boolean;
    _id:            string;
}

export interface SetIdOptional {
    numReps:        string;
    weight:         string;
    isDescending:   boolean;
    _id?:           string;
}

export interface RoutineCreateState {
    name:      string;
    typeUnit:  'kg' | 'lb';
    img:       string;
    timer:     number;
    _id?:      string;
}



/**
 * IMAGES
 */
export interface ImgsRoutines {
    imagesList: string[];
}

/**
 * MOVEMENTS
 */

export interface MovementResponse {
    total:      number;
    page:       number;
    limit:      number;
    movements:  Movement[];
    msg?:        string;
}

export interface Movement {
    _id:        string;
    date:       number;
    from:       UserMovement;
    to:         UserMovement[];
    routine:    Routine;
    routineAtSentMoment: Routine;
    msg?:        string;
}

export interface UserMovement{
    name:       string;
    email:      string;
    _id:        string;
    img:        string;
    status?:    'Pending' | 'Accepted' | 'Rejected';
}
/**
 * GROUPS
 */
export interface GetGroups {
    page:       number;
    limit:      number;
    total:      number;
    groups:     Group[];
    msg?:        string;
}

export interface GroupsResponse {
    group:      Group;
    msg?:       string;  
}

export interface Group {
    _id:          string;
    name:         string;
    users:        User[];
    admin:        User;
    creatorUser:  User;
    status:       boolean;
    creationDate: number;
    modifyDate:   number;
    description?: string;
    img?:         string;
    msg?:         string;
}

export interface CreateGroup {
    name:           string;
    users?:         User[];
    description?:   string;
    // img?:           string;
}

export interface PutGroup {
    name?:          string;
    img?:           string;
    description?:   string;
}


/**
 * SEARCH
 */
export interface SearchUsersInDB {
    results:     SearchUsersResult;
    msg?:        string;
}

export interface SearchUsersResult {
    users:      User[];
    groups:     Group[]
}

export interface SearchMovementsInDB {
    results:     Movement[];
    msg?:        string;
}

export interface UserAndGroup {
    name:       string;
    status:     boolean;
    movements?:  any[];
    _id:       string;
    role?:      string;
    google?:    boolean;
    email?:     string;
    img?:      string;
    msg?:      string;

    users?:        User[];
    admin?:        User;
    creatorUser?:  User;
    creationDate?: number;
    modifyDate?:   number;
}