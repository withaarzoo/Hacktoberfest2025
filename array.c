#include <stdio.h>
int sum(int a[0]){
    return a[0] + a[1];
}

int result;
int main(){
    int value[2];
    printf("Enter the first number : ");
    scanf("%d", &value[0]);
    printf("Enter the second number : ");
    scanf("%d", &value[1]);
      result = sum(value);

printf("this is the result of the  value  %d ", result);
return 0;
}
