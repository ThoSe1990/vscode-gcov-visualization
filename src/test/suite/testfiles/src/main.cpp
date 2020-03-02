#include <ctime>
#include <iostream>


void FunctionNeverCalled(std::time_t t)
{
    std::cout << t << " i was never called\n";
    return ;
}
void FunctionTwiceCalled(std::time_t t)
{
    std::cout << t << " i was twice called\n";
}

int main()
{
    std::time_t t = std::time(0);  // t is an integer type
    std::cout << t << " seconds since 01-Jan-1970\n";
    std::cout << "std= " << __cplusplus << std::endl;
    
    FunctionTwiceCalled(t);
    FunctionTwiceCalled(t);
    return 0;
}