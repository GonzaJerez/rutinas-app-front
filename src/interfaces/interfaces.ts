

/**
 * USERS & AUTHENTICATION
 */
export interface UserResponse {
    user:  User;
    token: string;
    msg:   string;
}

export interface User {
    movements: any[];
    name:      string;
    email:     string;
    status:    boolean;
    google:    boolean;
    role:      string;
    uid:       string;
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



/**
 * MUSCLES & WORKOUTS
 */
export interface GetWorkouts {
    workouts: Workout[];
    pathImg:  string;
}

export interface Workout {
    _id:    string;
    name:   string;
    muscle: Muscle;
    status: boolean;
    __v:    number;
}

export interface GetMuscles {
    muscles: Muscle[];
    pathImg: string;
}

export interface Muscle {
    _id:    string;
    name:   string;
    status: boolean;
    __v:    number;
}



/**
 * ROUTINES
 */
export interface GetRoutines {
    page:     number;
    limit:    number;
    total:    number;
    routines: Routine[];
    msg:      string;
}

export interface RoutineResponse {
    routine: Routine;
    msg:     string;
}

export interface Routine {
    name:              string;
    typeUnit:          'kg' | 'lb';
    creatorUser:       string;
    actualUser:        string;
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
    creatorUser?:       string;
    actualUser?:        string;
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
    _id:      string;
}

export interface WorkoutInRoutineIdOptional {
    workout:  Workout | string;
    tool:     string;
    sets:     SetIdOptional[];
    _id?:     string;
}

export interface Set {
    numReps: string;
    weight:  string;
    _id:     string;
}

export interface SetIdOptional {
    numReps: string;
    weight:  string;
    _id?:     string;
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

export interface Movement {
    _id:        string;
    msg:        string;
}

export interface SearchInDB {
    results:     User[] | Movement[];
    msg:         string;
}


/* export interface RoutineState {
    name:     string;
    typeUnit: string;
    img:      string;
    days:     DayState[];
}

export interface DayState {
    workouts?: WorkoutInRoutineState[];
    id?:        string;
}

export interface WorkoutInRoutineState {
    workout: string;
    tool:    string;
    sets?:   SetsState[];
    id?:      string;
}

export interface SetsState {
    numReps: string;
    weight:  string;
}
 */

// Generated by https://quicktype.io

