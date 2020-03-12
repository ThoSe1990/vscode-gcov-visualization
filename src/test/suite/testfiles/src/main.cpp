
#include <iostream>


void FunctionNeverCalled(int t)
{
    std::cout << t << " i was never called " << std::endl;
}
void FunctionTwiceCalled(int i)
{
    std::cout << "i was twice called, arg i: " << i << std::endl;
}

int main(int argc, char ** argv)
{
    int var;
    var = 10;

    FunctionTwiceCalled(var);
    FunctionTwiceCalled(var);
    return 0;
}